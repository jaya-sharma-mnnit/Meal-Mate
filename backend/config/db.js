import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://greatstack:nishu@cluster0.scbkais.mongodb.net/MEAL-MATE-MAIN', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit process with failure
    }
};
