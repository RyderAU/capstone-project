
### Instructions on how to run

1. Create a virtual environment:
`virtualenv env`
`source env/bin/activate`
To deactivate when you're done with everything you can go:
`deactivate`

2. Install requirement for m2crypto module
If you are on MacOS:
`brew install openssl && brew install swig`
`brew --prefix openssl`
`LDFLAGS="-L$(brew --prefix openssl)/lib" \
CFLAGS="-I$(brew --prefix openssl)/include" \
SWIG_FEATURES="-I$(brew --prefix openssl)/include" \
pip install m2crypto`

3. Set up database
If you are on MacOS:
`brew install postgresql`

4. Install requirements.txt
`pip3 install -r requirements.txt` 

5. Run the backend
`python3 backend/src_server.py`
The test server with stub functions can be run with:
`python3 backend/server.py`

6. Install the frontend dependencies by navigating to `/frontend` and run the frontend:
`npm install`
`npm start`


########

`chmod +x virtualenv.sh`

`. ./virtualenv.sh`

Run above bash script to run virtual environment in order to use python libraries.
Uncomment the first line inside virtualenv.sh file if you haven't installed virtualenv already.
