

const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;
const WINDOW_SIZE = 10; 

let numbersWindow = []; 
let totalSum = 0;

app.use(express.json());

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  try {
    const response = await axios.get(`https://api.testserver.com/numbers/${numberid}`);
    const receivedNumbers = response.data.numbers || [];

   
    const uniqueNumbers = [...new Set(receivedNumbers.filter(num => typeof num === 'number' && !isNaN(num)))];

   
    for (const num of uniqueNumbers) {
      if (numbersWindow.length === WINDOW_SIZE) {
        const oldestNum = numbersWindow.shift(); 
        totalSum -= oldestNum; 
      }
      numbersWindow.push(num);
      totalSum += num; 
    }

  
    const average = numbersWindow.length > 0 ? totalSum / numbersWindow.length : 0;


    const responseData = {
      windowPrevState: [...numbersWindow], 
      windowCurrState: [...numbersWindow], 
      numbers: receivedNumbers,
      avg: average.toFixed(2)
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Error fetching numbers from third-party server' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
