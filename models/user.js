const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      alias: {
        type: String,
        required: true,
        unique: true
      },
      age: {
        type: Number,
        required: true,
      },
      birthday: {
        type: String,
        default: "19-12-1909"
      },
      networkOne: {
        type: String,
        default: "NA"
      },
      networkTwo: {
        type: String,
        default: "NA"
      },   
      networkThree: {
        type: String,
        default: "NA"
      },
      networkFour: {
        type: String,
        default: "NA"
      }, 
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      _services: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
      }],
      picture: {
        type: String,
        default:
          "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg",
      },
      password: String,
      active: Boolean,
      avatar: String,
      role: {
        type: String,
        enum: ["Admin", "Client"],
        default: "Client",
        required: true,
      },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const User = model("User", userSchema);
  
  module.exports = User;