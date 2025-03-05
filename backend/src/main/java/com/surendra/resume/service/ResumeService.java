package com.surendra.resume.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ResumeService {

    @Value("${API_KEY}")
    private String key;

    public ResponseEntity<String> analysis(MultipartFile file, String jobDescription) {
        try {
            Tika tika = new Tika();
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + key;
            String extractedText = tika.parseToString(file.getInputStream());
            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", "Analyze this resume:\n" + extractedText +
                            "\nAgainst this job description:\n" + jobDescription +
                            "\nProvide output in strict JSON format with this structure:\n" + 
                            "{ \"matchPercentage\": number, \"matchedSkills\": [string], \"missingSkills\": [string], \"suggestions\": [string], \"resumeSummary\": string, \"jdClarity\": string, \"reason\": string }" +
                            "\nIf the job description is unclear or contains irrelevant details, set 'jdClarity' to 'unclear' or 'irrelevant' with an appropriate 'reason'. " +
                            "Otherwise, set 'jdClarity' to 'clear'. Ensure response contains only valid JSON, without additional text or formatting.")
                    ))
                )
            );
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> aiResponse = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            String jsonResponse = extractJson(aiResponse.getBody());
            System.out.println(jsonResponse);
            return ResponseEntity.ok(jsonResponse);
        } catch (IOException | TikaException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Error processing file: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Error calling AI API: " + e.getMessage() + "\"}");
        }
    }

    private String extractJson(String response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode candidates = rootNode.path("candidates");
            if (!candidates.isArray() || candidates.isEmpty()) {
                System.out.println("❌ AI response does not contain 'candidates' array!");
                return "{\"error\": \"Invalid AI response\"}";
            }
            JsonNode textNode = candidates.get(0)
                                          .path("content")
                                          .path("parts")
                                          .get(0)
                                          .path("text");

            if (textNode.isTextual()) {
                String rawText = textNode.asText().trim();
                rawText = rawText.replaceAll("```json", "").replaceAll("```", "").trim();
                objectMapper.readTree(rawText);
                return rawText;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "{\"error\": \"Failed to extract JSON\"}";
    }
}
