package main

import (
	"image"
	_ "image/jpeg"
	_ "image/png"

	"bufio"
	"fmt"
	"os"
	"strconv"

	"github.com/nfnt/resize"
)

var reader = bufio.NewReader(os.Stdin)

func getInput(par string) string {
	fmt.Print(par)
	text, _, err := reader.ReadLine()
	if err != nil {
		panic(err)
	}
	return string(text)
}

func toInt(val string) int {
	v, err := strconv.Atoi(val)
	if err != nil {
		panic(err)
	}
	return v
}

func main() {
	filename := getInput("Image: ")
	f, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	im, _, err := image.Decode(f)
	if err != nil {
		panic(err)
	}

	width := toInt(getInput("Max Width (works best with 5-10): "))
	height := toInt(getInput("Max Height (works best with 5-10, leave at 0 for scaling): "))

	im = resize.Resize(uint(width), uint(height), im, resize.Lanczos3)
	name := getInput("Name: ")

	outF := getInput("Output file (JS): ")
	err = os.WriteFile(outF, []byte(genCode(im, name)), os.ModePerm)
	if err != nil {
		panic(err)
	}
}
