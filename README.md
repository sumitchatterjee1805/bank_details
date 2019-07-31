# bank_details
API back-end for getting bank details created using NodeJS and PostgresSQL and deployed on Heroku server

This project consists of 3 API's:

1. API imitating sign-in to generate JWT
Request:-
HTTP-method: POST
URL: https://quiet-sands-70755.herokuapp.com/signin
Header: "Content-Type:application/json"
Body:
{
	"payload": {
		"user_id": "12345"
	},
	"email": "pqr@xyz.com"
}

Response:-
On success response header will contain the token as "x-access-token".


2. API to GET details of a branch for provided IFSC code
Request:-
HTTP-method: GET
URL: https://quiet-sands-70755.herokuapp.com/branch/ABHY0065001 || https://quiet-sands-70755.herokuapp.com/branch/ABHY0065001?limit=1000&offset=0
Header: "x-access-token: eyXXXXXXXXXXXXXXXXD71GZMCoerlQ"
        "email: pqr@xyz.com"
        "user_id: 12345"
        
Response:
On success the body will contain result like below:
{
    "result": [
        {
            "address": "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
            "bank_id": "60",
            "bank_name": "ABHYUDAYA COOPERATIVE BANK LIMITED",
            "branch": "RTGS-HO",
            "city": "MUMBAI",
            "district": "GREATER MUMBAI",
            "ifsc": "ABHY0065001",
            "state": "MAHARASHTRA"
        }
    ]
}


3. API to GET details of all the branches of a particular bank in a particular city
Request:-
HTTP-method: GET
URL: https://quiet-sands-70755.herokuapp.com/bank/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/city/MUMBAI || https://quiet-sands-70755.herokuapp.com/bank/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/city/MUMBAI?limit=10&offset=100
Header: "x-access-token: eyXXXXXXXXXXXXXXXXD71GZMCoerlQ"
        "email: pqr@xyz.com"
        "user_id: 12345"
        
Response:
On success the body will contain result like below:
{
    "result": [
        {
            "ifsc": "ABHY0065001",
            "bank_id": "60",
            "branch": "RTGS-HO",
            "address": "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
            "city": "MUMBAI",
            "district": "GREATER MUMBAI",
            "state": "MAHARASHTRA",
            "bank_name": "ABHYUDAYA COOPERATIVE BANK LIMITED"
        },
        {
            "ifsc": "ABHY0065002",
            "bank_id": "60",
            "branch": "ABHYUDAYA NAGAR",
            "address": "ABHYUDAYA EDUCATION SOCIETY, OPP. BLDG. NO. 18, ABHYUDAYA NAGAR, KALACHOWKY, MUMBAI - 400033",
            "city": "MUMBAI",
            "district": "GREATER MUMBAI",
            "state": "MAHARASHTRA",
            "bank_name": "ABHYUDAYA COOPERATIVE BANK LIMITED"
        }
    ]
}

Note: 'offset' and 'limit' are optional query parameters. If not provided, will default to 'offset: 0' and 'limit: 1000'.
A .bat file has been added to test the APIs. The headers has been added with default token.
