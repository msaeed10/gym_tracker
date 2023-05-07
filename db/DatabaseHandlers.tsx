import Realm from "realm";

const RegionsSchema = {
    name: "Region",
    properties: {
        _id: "string",
        address: "string",
        city: "string",
        state: "string",
        zipCode: "string",
        meters: "string",
    },
    primaryKey: "_id"
}

export const writeRegion = async () => {
    try {
        await Realm.open({
            path: "myrealm",
            schema: [RegionsSchema]
        }).then(realm => {
            realm.write(() => {
                let region = realm.create("Region", {
                    _id: "1",
                    address: "Test Address",
                    city: "Test city",
                    state: "Test state",
                    zipCode: "Test zipCode",
                    meters: "Test meters"
                });
        
                console.log(`Created region ${region}`);
            });
        });
    } catch(e) {
        console.log(`caught exception ${e}`)
    }
}

export const getRegions = async () => {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [RegionsSchema]
    })

    return realm.objects("Region");
}

export const deleteRegion = async () => {
    try {
        await Realm.open({
            path: "myrealm",
            schema: [RegionsSchema]
        }).then(realm => {
            realm.write(() => {
                realm.deleteAll();
                console.log("deleted region with id 1")
            });
        });
    } catch(e) {
        console.log(`caught exception ${e}`)
    }
}