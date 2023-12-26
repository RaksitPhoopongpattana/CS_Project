var express = require('express');
var router = express.Router();
const connection = require('../lib/db')
const lineNotify = require('line-notify-nodejs')('EQq7pCLYMbzmQrmQMNo8ugV7rvSJiGnvEaUq0eKROo2');
//------------MQTT section------------//
const mqtt = require("mqtt"); // import mqtt connect
// mqtt configuration
const mqttConfig = {
  host: "vps163.vpshispeed.net",
  port: 1883,
  username: "b2er",
  password: "123456",
};
const topic = 'EC-PH/DETECH-01'

let data = ""

const client = mqtt.connect(mqttConfig); // create connection to mqtt broker
client.on("connect", function () {
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish("tasmota", "Hello from application mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});
//------------------------------------//

router.get('/', function (req, res, next) {
  res.end('HI');

});

router.get('/data', function (req, res, next) {
  let data = "ผักกาดแก้ว"
  let query = "SELECT ec,ph,(select ec_min from setting where name = '" + data + "' ORDER BY date DESC limit 1) as ec_min,(select ec_max from setting where name = '" + data + "' ORDER BY date DESC limit 1) as ec_max,(select ph_min from setting where name = '" + data + "' ORDER BY date DESC limit 1) as ph_min,(select ph_max from setting where name = '" + data + "' ORDER BY date DESC limit 1) as ph_max FROM `datadb` ORDER BY `id` DESC LIMIT 1"

  connection.connect.query(
    query,
    function (error, results, field) {
      // console.log(results)
      if (!error) {
        user = { "EC": results[0].ec, "PH": results[0].ph, "minPH": results[0].ph_min, "maxPH": results[0].ph_max, "minEC": results[0].ec_min, "maxEC": results[0].ec_max }
        res.end(JSON.stringify(user));


        if (parseFloat(results[0].ec) < parseFloat(results[0].ec_min)) {
          lineNotify.notify({
            message: 'ค่า EC น้อยกว่าที่ตั้งไว้',
          }).then(() => {
            console.log('send completed!');
          });
        } else if (parseFloat(results[0].ec) > parseFloat(results[0].ec_max)) {
          lineNotify.notify({
            message: 'ค่า EC มากกว่าที่ตั้งไว้',
          }).then(() => {
            console.log('send completed!');
          });
        }

        if (parseFloat(results[0].ph) < parseFloat(results[0].ph_min)) {
          lineNotify.notify({
            message: 'ค่า PH น้อยกว่าที่ตั้งไว้',
          }).then(() => {
            console.log('send completed!');
          });
        } else if (parseFloat(results[0].ph) > parseFloat(results[0].ph_max)) {
          lineNotify.notify({
            message: 'ค่า PH มากกว่าที่ตั้งไว้',
          }).then(() => {
            console.log('send completed!');
          });
        }


      } else {
        res.redirect('/')
      }
    });
});

router.get('/dataall', function (req, res, next) {
  connection.connect.query(
    'SELECT * FROM `datadb` ORDER BY `id` DESC limit 15',
    function (error, results, field) {

      if (!error) {
        res.end(JSON.stringify(results));
      } else {
        res.redirect('/')
      }
    });
});

router.post("/select", function (req, res, next) {
  data = req.body.data
  console.log(req.body)
  res.redirect('/data')
});

router.post("/setting", function (req, res, next) {
  console.log(req.body)
  let query = "INSERT INTO `setting`(name,ph_min,ph_max,ec_min,ec_max) VALUES ('" + data + "','" + req.body.minph + "','" + req.body.maxph + "','" + req.body.minec + "','" + req.body.maxec + "')"
  console.log(query)
  connection.connect.query(query,
    function (error, results, field) {

      if (!error) {
        res.redirect('http://vps163.vpshispeed.net:3000/Dashboard?plant=' + data)
      } else {
        res.redirect('/')
      }
    });

});

router.post("/mqtt", function (req, res, next) {
  client.publish(topic, req.body.data);
  res.redirect('/')
});

module.exports = router;
