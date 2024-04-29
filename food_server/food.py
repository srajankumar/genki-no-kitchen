from flask import Flask, jsonify, request
import anthropic
import base64
import httpx
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
api_key = "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"
client = anthropic.Anthropic(api_key=api_key)

@app.route('/describe_vegetable',methods=['POST'])
def describe_vegetable():
    image_url = request.json.get('image')
   

   
    
    image_content = base64.b64encode(httpx.get(image_url).content).decode("utf-8")
    
    
    image_media_type = "image/jpeg"
    
    
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image_media_type,
                            "data": image_content,
                        },
                    },
                    {
                        "type": "text",
                        "text": "describe the vegetable and dishes can be prepared with it. give in json format"
                    }
                ],
            }
        ],
    )
      
    response_data=message.content[0].text
    response_data= response_data.replace('\n', ' ')
    response_data= response_data.replace('\ ', ' ')
    
    return (response_data)



if __name__ == '__main__':
    app.run(debug=True)