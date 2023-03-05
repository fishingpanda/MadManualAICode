import express from 'express'

import {google} from 'googleapis';
import cors from 'cors'


const app = express();
app.use(cors())   //allows cross orgin requests - 



app.get("/", async(req,res)=>{


    const auth = new google.auth.GoogleAuth({

        keyFile:'gapi_credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',        
 
    });

    // Create a client object
    const client = await auth.getClient();

    // Load the Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    const SPREADSHEET_ID = "1-GI5dhorXwmgDGBic-GkEmQUeGWZ4-tpSLJKdNFUPbQ";

    // Make API request to get data from sheet
    const response_gapi = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2:B20',
    });


    res.status(200).send(response_gapi);
     

});


app.listen(5001, () => console.log('AI server started on http://localhost:5001'))