import unittest
import json
import io
import os

class TestStringMethods(unittest.TestCase):

    def test_defined_json(self):
        x = {
            "value" : 0
        }
        self.assertEqual("{\"value\": 0}", json.dumps(x))

    def test_loaded_json(self):
        with io.open(os.path.join('./', "test.json"), 'w') as db_file:
            db_file.write(json.dumps({
                "score" : 0 
            }))
        with open("test.json") as json_file:
            self.assertEqual("{\"score\": 0}", json.dumps(json.load(json_file)))

if __name__ == '__main__':
    unittest.main()