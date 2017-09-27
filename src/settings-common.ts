const settings: Object = {
    "endPoints": {},
    "reduxPersist": {
        "hydrator": {
            "log": false
        },
        "persistorConfig": {
            "keyPrefix": "IF-ANY-",
            "transforms": [],
            "blacklist": [],
            "whitelist": []
        },
        "transform": {
            "encryption": {
                "enabled": true,
                "secretKey": "QzSt3OrPYyxKhRuZX0RChtknpJmre5C3"
            }
        }
    }
};

/* tslint:disable */
export default settings;
