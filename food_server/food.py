from flask import Flask, jsonify, request
import anthropic
import base64
import httpx

app = Flask(__name__)

api_key = "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"
client = anthropic.Anthropic(api_key=api_key)

@app.route('/describe_vegetable',methods=['POST'])
def describe_vegetable():
    image_url = request.json.get('image_url')
   

   
    # image_url ='https://www.allrecipes.com/thmb/brfErTFaPtzGDuqLCU9X47ZNA24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-tell-if-mango-is-ripe-2x1-4f96cb6405f644d68df8652e0650ac4d.jpg'
    
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
                        "text": "describe the vegetable and dishes can be prepared with it. "
                    }
                ],
            }
        ],
    )
      
    response_data=message.content[0].text
    response_data= response_data.replace('\n', '\n')
    
    
    return jsonify({"ans":response_data})



if __name__ == '__main__':
    app.run(debug=True)
