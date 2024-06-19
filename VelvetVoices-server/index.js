const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
// Middleware Connections
const corsConfig = {
    origin: ["http://localhost:5173" , "https://velvet-voices.web.app" , "https://velvet-voices.firebaseapp.com"],
    credentials: true,
};
app.use(cors(corsConfig));

const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rchpnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
client
    .connect()
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function run() {
    try {
        const surveysCollection = client.db("velvetVoicesDB").collection("surveys");
        const usersCollection = client.db("velvetVoicesDB").collection("users");
        const reportsCollection = client.db("velvetVoicesDB").collection("reports");
        const paymentsCollection = client.db("velvetVoicesDB").collection("payments");
        const commentCollection = client.db("velvetVoicesDB").collection("comments");

        // Insert users in database
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'User already exists', insertedId: null });
            }
            const result = await usersCollection.insertOne(user);
            res.send({ message: 'User created successfully', insertedId: result.insertedId });
        });


        // GET all surveys
        app.get('/surveys', async (req, res) => {
            try {
                const surveys = await surveysCollection.find().toArray();
                res.json(surveys);
            } catch (error) {
                console.error('Error fetching surveys:', error);
                res.status(500).json({ error: 'Failed to fetch surveys' });
            }
        });



        // Get a survey by ID
        app.get('/surveys/:id', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send('Invalid ID format');
            }
            const result = await surveysCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // Create a new survey
        app.post('/surveys', async (req, res) => {
            const survey = req.body;
            const result = await surveysCollection.insertOne(survey);
            res.send(result);
        });

        // Update a survey
        app.put('/surveys/:id', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send('Invalid ID format');
            }
            const updatedSurvey = req.body;
            const result = await surveysCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedSurvey }
            );
            res.send(result);
        });

        // Vote on a survey
        app.post('/surveys/vote', async (req, res) => {
            const { id, vote, userEmail, userName } = req.body;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send('Invalid ID format');
            }
            const response = { userEmail, userName, vote };
            const updateField = vote === 'yes' ? 'yesVotes' : 'noVotes';
            const result = await surveysCollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $inc: { [updateField]: 1, votes: 1 },
                    $push: { responses: response }
                }
            );
            res.send(result);
        });

        // Check if user is admin
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        });

        // Check if user is surveyor
        app.get('/users/surveyor/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let surveyor = false;
            if (user) {
                surveyor = user?.role === 'surveyor';
            }
            res.send({ surveyor });
        });
        // Check if user is pro-user
        app.get('/users/pro-user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let proUser = false;
            if (user) {
                proUser = user?.role === 'pro-user';
            }
            res.send({ proUser });
        });

        // GET users with optional role filter
        app.get('/dashboard/admin/users', async (req, res) => {
            try {
                const { role } = req.query;
                const query = role ? { role } : {};
                const users = await usersCollection.find(query).toArray();
                res.json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Failed to fetch users' });
            }
        });

        // PUT to update user role
        app.put('/dashboard/admin/users/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { role } = req.body;
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { role: role } }
                );
                res.json(result);
            } catch (error) {
                console.error('Error updating user role:', error);
                res.status(500).json({ error: 'Failed to update user role' });
            }
        });

        // Publish/unpublish surveys
        app.put('/dashboard/admin/surveys/:id/publish', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send('Invalid ID format');
            }
            const { published } = req.body;
            const result = await surveysCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { published: published } }
            );
            res.send(result);
        });

        // View all payments
        app.get('/dashboard/admin/payments', async (req, res) => {
            const paymentsCollection = client.db("velvetVoicesDB").collection("payments");
            const payments = await paymentsCollection.find({}).toArray();
            res.send(payments);
        });

        //report store
        app.post('/reports', (req, res) => {
            const { email, id } = req.body;
            if (!email || !id) {
                return res.status(400).send('Email and survey ID are required.');
            }

            const newReport = { email, surveyId: id, reportedAt: new Date() };

            reportsCollection.insertOne(newReport, (err, result) => {
                if (err) {
                    return res.status(500).send('Error reporting survey');
                }
                res.status(201).send({ insertedId: result.insertedId });
            });
        });

        // GET route to fetch reported surveys by user email
        app.get('/reports/:email', async (req, res) => {
            const { email } = req.params;
            if (!email) {
                return res.status(400).send('Email is required.');
            }

            try {
                const reports = await reportsCollection.find({ email }).toArray();
                if (reports.length === 0) {
                    return res.status(200).send([]);
                }

                const surveyIds = reports.map(report => report.surveyId); // Don't convert surveyId to ObjectId here

                const surveys = await surveysCollection.find({ _id: { $in: surveyIds.map(id => new ObjectId(id)) } }).toArray(); // Convert surveyIds to ObjectId here

                const reportedSurveys = surveys.map(survey => {
                    const report = reports.find(report => report.surveyId.toString() === survey._id.toString()); // Compare surveyId as strings
                    return {
                        ...survey,
                        reportedAt: report.reportedAt
                    };
                });

                res.status(200).send(reportedSurveys);
            } catch (error) {
                console.error('Error fetching reported surveys:', error);
                res.status(500).send('Error fetching reported surveys');
            }
        });

        // fetch the 6 most voted surveys
        app.get('/featured-surveys', async (req, res) => {
            try {
                const surveys = await surveysCollection.find().sort({ votes: -1 }).limit(6).toArray();
                res.status(200).send(surveys);
            } catch (error) {
                console.error('Error fetching featured surveys:', error);
                res.status(500).send('Error fetching featured surveys');
            }
        });

        // GET route to fetch the 6 most recently created surveys
        app.get('/latest-surveys', async (req, res) => {
            try {
                const surveys = await surveysCollection.find().sort({ created_at: -1 }).limit(6).toArray();
                res.status(200).send(surveys);
            } catch (error) {
                console.error('Error fetching latest surveys:', error);
                res.status(500).send('Error fetching latest surveys');
            }
        });

        // payment intent
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            console.log(amount, 'amount inside the intent')

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentsCollection.insertOne(payment);

            if (paymentResult.insertedId) {
                // Update the user's role to pro-user
                const updateResult = await usersCollection.updateOne(
                    { email: payment.email },
                    { $set: { role: 'pro-user' } }
                );

                res.send({ paymentResult, updateResult });
            } else {
                res.status(500).send('Failed to process payment');
            }
        });

        // Middleware to check if user is pro-user
        const isProUser = async (req, res, next) => {
            const { userEmail } = req.body;
            const user = await usersCollection.findOne({ email: userEmail });
            if (user && user.role === 'pro-user') {
                next();
            } else {
                res.status(403).send({ message: 'Only pro-users can comment on surveys' });
            }
        };

        // Add new comment to commentCollection
        app.post('/comments', isProUser, async (req, res) => {
            const { surveyId, userEmail, userName, comment } = req.body;
            const newComment = { surveyId, userEmail, userName, comment, date: new Date() };
            const result = await commentCollection.insertOne(newComment);
            res.send(result);
        });

        // Fetch comments for a specific survey
        app.get('/comments/:surveyId', async (req, res) => {
            const { surveyId } = req.params;
            const comments = await commentCollection.find({ surveyId }).toArray();
            res.send(comments);
        });

        // Route to fetch comments for a specific user
        app.get('/comments', async (req, res) => {
            const userEmail = req.query.userEmail;
            if (!userEmail) {
                return res.status(400).json({ error: 'User email is required' });
            }

            try {
                // Assuming you have a MongoDB collection named "comments"
                const comments = await commentCollection.find({ userEmail }).toArray();
                res.json(comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('VelvetVoices is running');
});

app.listen(port, () => {
    console.log(`VelvetVoices is running on port ${port}`);
});
