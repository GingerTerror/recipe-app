from google import genai

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
#cors = CORS(app, origins="*")
CORS(app)


@app.route('/api/meal-suggestion',methods=['GET'])

def users():
    client = genai.Client(api_key="AIzaSyDUn89kualCQidUdk_VhGrfQuDMVqvBlxk")

    ingredients = ["carrots", "brocolli", "noodles", "sweetcorn", "bell peppers"]
    prompt = "I only have the following ingredients: "
    for ingredient in ingredients:
        prompt = prompt + ingredient + " "

    prompt = prompt + ". What meal can I make with these?"

    response = client.models.generate_content(
        # model="gemini-2.0-flash", contents="Explain how AI works"
        model="gemini-2.0-flash", contents=prompt
    )
    # print(response.text)
    meal_idea = response.candidates[0].content.parts[0].text

    return jsonify({"meal_idea": meal_idea})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
