#include "stdio.h"
#include "stdlib.h"
#include "string.h"

void btoa (char* buf, char* input, size_t size) {
  unsigned int byte;
  for (int i = 0; i < size - (size % 8); i+=8) {
    byte = 0;
    for (int j = 7; j >= 0; j--) {
      byte |= (input[i + j] & 1) << 7 - j;
    }
    printf("%c : %u", byte, byte);
  }
  printf("\n");
}

void atob (char* buf, char* input, size_t size) {
  unsigned int byte;
  for (int i = 0; i < size; i++) {
    byte = (unsigned int)input[i];
    for (int j = 7; j >= 0; j--) {
      printf("%u", (byte >> j) & 1);
    }
    printf(" ");
  }
  printf("\n");
}

int main () {
  char* buf = malloc(128);
  char* output = malloc(128);
  int status = 1;
  while (fgets(buf, 127, stdin)) {
    if (strncmp(buf, ".c", 2) == 0) status ^= 1;
    else {
      if (status == 1) atob(output, buf, strlen(buf) - 1);
      else btoa(output, buf, strlen(buf) - 1);
      memset(output, 0, 128);
      memset(buf, 0, 128);
    }
  }
  free(buf);
}
