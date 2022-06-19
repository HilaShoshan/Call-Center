# Call-Center
## Big data analytics system for predicting and presenting call center data

The project simulates a system of a company that provides Internet, Cable TV and Cellular services.
The company receives calls during the day from people who want to join / service / complaint / disconnect.
We use Lambda Architecture to analyze the calls data, where the Gateway in our project is Kafka, the Cold path is the BigMLAnalytics part, and the Warm path is the RealTimeDashboard part.

### This project consists of 4 main parts:

1. CustomerData: stores data about customers in our company in a MySQL database, using https://mysql.site4now.net/ cloud service. 
   Our customer_data table is:
   
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/mysql.png)
   
2. Simulator: produces incoming calls (with a slight bias, so that we can learn from it), and send them as messages to Kafka:
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/kafka-massage.png)
   Then, kafka will send it to the two following consumers. 

3. RealTimeDashboard: uses Redis Docker Image (https://hub.docker.com/_/redis) to store the calls data of the current day and present it in tables / widgets.
   For example, the average waiting time by hours:
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/dashboard-waitingavg.png)
   The calls' topics today:
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/dashboard-topics.png)
   The number of calls during the day:
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/dashboard-numtopics.png)
   
4. BigMLAnalytics: uses Atlas cloud service of MongoDB (https://www.mongodb.com/) to store the calls data from the first day of the company, for analysis and predictions. 
   In addition, uses BigML (https://bigml.com/api/authentication) to apply a Decision-Tree model and make predictions about a new call's topic. 
   In the following UI, you can enter data on some incoming call, and get BigML's prediction about the call's topic [join / service / complaint / disconnect]:
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/bigml-home.png)
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/bigml-predict.png)
   ![](https://github.com/HilaShoshan/Call-Center/blob/main/readme_images/bigml-modelinfo.png)
   

### To run our project:
Open 4 terminals, one in each main directory, and run the following commands (in the same order):

1) (CustomerData) node ./app.js
2) (Simulator) node ./index.js
3) (BigMLAnalytics) node ./app.js
4) (RealTimeDashboard) node ./app.js

Then, open in browser:
1) localhost:3001 for running BigMLAnalytics website
2) localhost:4000 for running RealTimeDashboard website
