# Learning Summary

In this material, i finally use the pg library to access my postgres databases.

So basically there are few steps to do in order to use the pg library, they are:
- make a Client class from pg library and give required parameter such as user, host, database, password, port.
- use .query method to send a query into the database.
- lastly dont forget to call .end method to close connection from the database (important!).