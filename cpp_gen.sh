g++ -shared -c -fPIC gen.cpp -o gen.o
g++ -shared -Wl,-soname,library.so -o library.so gen.o