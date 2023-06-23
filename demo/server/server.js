const express = require("express");
const nodemailer = require('nodemailer');
var mysql = require('mysql');

var cors = require('cors')
let app = express()
app.use(express.json())
app.use(cors())

const bcrypt = require('bcrypt');
const e = require("express");
const saltRounds = 10;



var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'RaGuL@08',
  database: 'registration'
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ragulpriyanjoy@gmail.com',
    pass: 'vzbenfwmmhmkenog'
  }
});

// Function to send the email
    const sendEmail = async (email, subject, text) => {
      const mailOptions = {
        from: 'ragulpriyanjoy@gmail.com',
        to: email,
        subject: subject,
        text: text
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }

    };


const generateVerificationCode = () => {
  return Math.floor(Math.random() * 9000);
};

app.post('/insert', addUser)

async function addUser(req, res) {
  const { name, email, mobilenumber, password } = req.body;
  console.log(req.body);
  let sql = "SELECT * FROM signuptable WHERE email = ?";
  connection.query(sql, [email], async function (error, results) {
    if (error) {
      return res.json(error);
    }
    else {
      if (results.length > 0) {
        if (results[0].is_verified == 1) {
          console.log('Email already exists');
          return res.json({ error: 'something went wrong' });
        }
        else {
          const subject = req.body.subject;
          const otp = generateVerificationCode().toString();
          const text = 'Your verification code is: ' + otp;
          const verificationCode =  generateVerificationCode();
          connection.query(`update signuptable set verification_code = ? where email = ?`, [verificationCode, email], async function (error, results) {
            if (error) {
              console.log(error);
            }
            await sendEmail(email, subject, text);
            return res.json({ message: 'Email sent successfully', otp });
          });
        }
      }

      if (results.length === 0) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        sql = "INSERT INTO signuptable (name,email,mobile_number,password,is_verified,verification_code) VALUES (?,?,?,?,?,?)";
        connection.query(sql, [name, email, mobilenumber, hash, 0, 0], async function (error, results) {
          if (error) {
            console.log(error);
            return res.json({ error: 'An error occurred' });
          }
          const subject = req.body.subject;
          const otp = generateVerificationCode().toString();
          const text = 'Your verification code is: ' + otp;
          const verificationCode = generateVerificationCode();
          connection.query(`update signuptable set verification_code = ? where email = ?`, [verificationCode, email], async function (error, results) {
            if (error) {
              console.log(error);
            }
            await sendEmail(email, subject, text);
            res.json({ message: 'Email sent successfully', otp });
          });
        });
      }
    }
  })

}
app.post('/verify', verifyUser);
async function verifyUser(req, res) {
  const { email, otp } = req.body;
  console.log(req.body);
  let sql = "SELECT * FROM signuptable WHERE email = ?";
  connection.query(sql, [email], async function (error, results) {
    if (error) {
      return res.json(error);
    }
    else {
      if (results.length > 0) {
        if (results[0].verification_code == otp) {
          sql = "UPDATE signuptable SET is_verified = ? WHERE email = ?";
          connection.query(sql, [1, email], async function (error, results) {
            if (error) {
              console.log(error);
              return res.json({ error: 'An error occurred' });
            }
            return res.json({ message: 'User verified successfully' });
          });
        }
        else {
          return res.json({ error: 'Invalid OTP' });
        }
      }
      else {  
        return res.json({ error: 'User not found' });
      }
    }
  })
}


// console.log(req.body);
// const email = req.body.email;
// const subject = req.body.subject;
// const otp = generateVerificationCode().toString();
// const text = 'Your verification code is: ' + otp;

// const hash=bcrypt.hashSync(req.body.password, saltRounds);



//   connection.query(
//     `INSERT INTO signuptable (name, password, email, mobile_number, is_verified, verification_code) VALUES (?, ?, ?, ?, ?, ?)`,
//     [req.body.name, hash, req.body.email, req.body.mobileNumber, 0, 0],
//     function (error, results) {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       if (!email) {
//         res.status(400).json({ error: 'No recipient email provided' });
//       } else {
//         sendEmail(email, subject, text); // Call the sendEmail function
//         res.status(200).json({ message: 'Email sent successfully', otp });
//       }
//     }
//   );

app.post('/login', userLogin);
async function userLogin(req, res) {
  const { email, password } = req.body;

  console.log(email, password);

  let sql = 'SELECT * FROM signuptable where email=?';

  connection.query(sql, [email], async (err, result) => {

    if (err) {

      console.log(err, 'error___________');

      return res.json({ error: 'An error occurred' });

    } else {

      if ((result.length > 0) && (result[0].is_verified === 1)) {

        const comparePassword = compareSync(password, result[0].password);

        // console.log(comparePassword);

        if (comparePassword) {

          return res.json({ result: 'Login Successfull' });

        } else {

          return res.json({ error: 'false' });

        }

      } else {

        return res.json({ error: 'false' });

      }

    }

  });
}






app.listen(3002, () => {
  console.log("listening on  port 3002")
})

