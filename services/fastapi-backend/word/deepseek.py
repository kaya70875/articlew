def analyze_word(word , client):

    messages = [
        {
            "role": "user",
            "content": f"Can you analyze the word '{word}' and give an example of its usage? Do not analysis word's origin and please keep it short."
        }
    ]

    # Get the final result
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B", 
        messages=messages, 
        max_tokens=1000,
        temperature=0.5,
    )

    # Extract the response
    response = completion.choices[0].message.content

    # Remove the <think> section and extract the final answer
    if "<think>" in response:
        # Split the response into <think> and final answer
        final_answer = response.split("</think>")[-1].strip()
    else:
        final_answer = response
    
    return final_answer