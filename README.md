####Airbnb API#####

url: https://www.airbnb.com/s/Austin--TX--United-States/homes?refinements%5B%5D=homes&in_see_all=true&allow_override%5B%5D=&s_tag=QkGJ9fp6   (AUSTIN/HOMES)

The application  extracts the list of Homes from airbnb(from the provided URL) and stores the informations in MONGO DB.

#############
No of files: 2

Main File    :   airbnb.js
Database File:   database.js


#############

Execution time: 3 seconds to extract the whole website( 300+ homes in 17+ pages).


#############MONGO TABLE ###########
+------+----------+-------+-------+-----------+
| Rank | HomeName | Space | Price | Superhost |
+------+----------+-------+-------+-----------+
|      |          |       |       |           |
+------+----------+-------+-------+-----------+
|      |          |       |       |           |
+------+----------+-------+-------+-----------+
|      |          |       |       |           |
+------+----------+-------+-------+-----------+


the mongo table output is exported in CSV file for reference.