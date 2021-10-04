# Use the command as follows to start running the service.

brew services start postgresql

# To stop running the service to free up resources on your local machine you can use the following command to stop postgres from running.
# brew services stop postgresql

# You should stop running the service to free up resources on your local machine. 
# You can use the following command to stop postgres from running.

# brew services stop postgresql

`psql postgres; CREATE DATABASE ourunsw;`

`psql ourunsw -f ourunsw.sql`

`psql ourunsw`

`Select * from Students;`


