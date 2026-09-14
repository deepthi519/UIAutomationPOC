package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Reads test data from JSON files under src/test/resources/testdata/.
 */
public class JsonReader {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final String BASE_PATH = "src/test/resources/testdata/";

    /**
     * Returns the root JsonNode for the given JSON file.
     *
     * @param fileName file name including extension (e.g. "users.json")
     * @return parsed JsonNode
     */
    public static JsonNode readJson(String fileName) {
        try {
            return mapper.readTree(new File(BASE_PATH + fileName));
        } catch (IOException e) {
            throw new RuntimeException("Failed to read JSON file: " + fileName, e);
        }
    }

    /**
     * Returns a list of objects of the given type from a JSON array file.
     *
     * @param fileName JSON file name
     * @param clazz    target class
     * @param <T>      element type
     * @return list of deserialized objects
     */
    public static <T> List<T> readList(String fileName, Class<T> clazz) {
        try {
            JsonNode root = readJson(fileName);
            List<T> items = new ArrayList<>();
            for (JsonNode node : root) {
                items.add(mapper.treeToValue(node, clazz));
            }
            return items;
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse JSON list: " + fileName, e);
        }
    }
}
