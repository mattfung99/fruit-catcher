#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
}

extern "C" int generate_int(int min, int max) {
    return (rand() % max) + min;
}