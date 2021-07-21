#include <stdio.h>
#include <stdlib.h>
#include <time.h>

extern "C" int generate_int() {
    srand(time(0));
    return rand() % 5; 
}