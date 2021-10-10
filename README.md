`chmod +x virtualenv.sh`

`. ./virtualenv.sh`

Run above bash script to run virtual environment in order to use python libraries.
Uncomment the first line inside virtualenv.sh file if you haven't installed virtualenv already.

####################

1. Create a virtual environment, you can use the both script or:
`virtualenv env`
`source env/bin/activate`
To deactivate when you're done you can go:
`deactivate`

2. Install requirements.txt
`pip3 install -r requirements.txt` 

3. Run the backend
`python3 backend/src_server.py`
The test server with stub functions can be run with:
`python3 backend/server.py`

4. Install the frontend dependencies by navigating to `/frontend` and run the frontend:
`npm install`
`npm start`
