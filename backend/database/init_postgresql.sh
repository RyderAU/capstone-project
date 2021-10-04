#!/bin/sh

# Now that we have the Postgres database installed on our machine, we need to start the service to be available for use. Use the command as follows to start running the service.

brew services start postgresql

# Once the service starts, you are good to go ahead and use it. However, as a good practice, you should also stop running the service to free up resources on your local machine. You can use the following command to stop postgres from running.
# brew services stop postgresql


# psql postgres

psql ourunsw


# You should stop running the service to free up resources on your local machine. 
# You can use the following command to stop postgres from running.

# brew services stop postgresql
