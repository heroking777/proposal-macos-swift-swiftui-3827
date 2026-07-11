import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

interface CrashReport {
  userId: string;
  crashLog: string;
  timestamp: Date;
}

let crashReports: CrashReport[] = [];

app.post('/api/reportCrash', (req, res) => {
  const { userId, crashLog } = req.body;

  if (!userId || !crashLog) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const report: CrashReport = {
    userId,
    crashLog,
    timestamp: new Date(),
  };

  crashReports.push(report);

  // Here you would typically integrate with a bug tracking system or send the report to an email
  console.log('Received crash report:', report);

  res.status(201).json({ message: 'Crash report received' });
});

app.get('/api/crashReports', (req, res) => {
  res.json(crashReports);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});