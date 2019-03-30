module.exports = function () {

    var opers = {

        //insert

        Insert: function (collection, data) {
            collection.insert(data, function (err, result) {
                console.log(result);
                console.log("Dodaje dane");
            });
        },

        //select all - zwraca tablicę pasujących dokumentów

        SelectAll: function (collection, callback) {
            collection.find({}).toArray(function (err, items) {
                console.log(items[0]._id);
                console.log("Wybieram dane");
                if (err) console.log(err)
                    //funkcja zwracająca dane na zewnątrz
                else callback(items)
            });
        },

        //select - zwraca tablicę pasujących dokumentów, z ograniczeniem

        SelectAndLimit: function (collection, callback) {
            collection.find({ login: "test" }).toArray(function (err, items) {
                console.log(items)
                if (err) console.log(err)
                    //funkcja zwracająca dane na zewnątrz
                else callback(items)
            });
        },

        //delete - usunięcie poprzez id - uwaga na ObjectID

        DeleteById: function (ObjectID, collection, data) {
            collection.remove({ _id: ObjectID(data._id) }, function (err, data) { //ObjectID(id)
                //console.log(data)
                console.log("Usuwam dane");
            })
        },

        // update - aktualizacja poprzez id - uwaga na ObjectID
        // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
        // z $set - dokunuje aktualizacji tylko wybranego pola

        UpdateById: function (ObjectID, collection, data) {
            collection.updateOne(
                { _id: ObjectID(data._id) },
                { $set: { b: data.password } },
                function (err, data) {
                    console.log("Update: " + data)
                })
        },

    }

    return opers;

}