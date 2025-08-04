from flask import Flask, render_template, request, jsonify, session
import json
import os
from datetime import datetime
from basic_operations import add, subtract, multiply, divide

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Path to the history file
HISTORY_FILE = 'calculation_history.json'

def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_history(history):
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=4)

@app.route('/')
def index():
    history = load_history()
    return render_template('index.html', history=history)

@app.route('/calculate', methods=['POST'])
def calculate_api():
    try:
        data = request.get_json()
        expression = data.get('expression')
        
        # Simple parsing for 'number operator number'
        parts = expression.split()
        if len(parts) != 3:
            return jsonify({'error': 'Invalid expression format. Use "number operator number".'}), 400
        
        operand1 = float(parts[0])
        operator = parts[1]
        operand2 = float(parts[2])

        if operator == '+':
            result = add(operand1, operand2)
        elif operator == '-':
            result = subtract(operand1, operand2)
        elif operator == '*':
            result = multiply(operand1, operand2)
        elif operator == '/':
            result = divide(operand1, operand2)
        else:
            return jsonify({'error': 'Invalid operator.'}), 400
        
        # Save to history
        new_entry = {
            'expression': expression,
            'result': result,
            'timestamp': datetime.now().isoformat()
        }
        history = load_history()
        history.insert(0, new_entry) # Add to the top
        save_history(history)

        return jsonify({'result': result, 'history': history})
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred.'}), 500

@app.route('/history', methods=['GET'])
def get_history():
    history = load_history()
    return jsonify(history)

@app.route('/clear-history', methods=['POST'])
def clear_history():
    save_history([])
    return jsonify({'message': 'History cleared successfully.'})

if __name__ == '__main__':
    app.run(debug=True)