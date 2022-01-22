package main

import (
	"fmt"
	"image"
	"strings"
)

const category = "special"

func genCode(im image.Image, name string) string {
	out := &strings.Builder{}
	fmt.Fprintf(out, `elements.%s_top = {
	color: "#000000",
	behavior: [
		"XX|DL|XX",
		"XX|DL%%5|XX",
		"XX|XX|XX",
	],
	category: "special",
	state: "solid",
	density: 6942.0,
	hidden: true,
}`+"\n\n", name)
	for y := im.Bounds().Dy() - 1; y >= 0; y-- {
		for x := 0; x < im.Bounds().Dx(); x++ {
			r, g, b, _ := im.At(x, y).RGBA()
			if r == 0 && g == 0 && b == 0 {
				continue
			}
			r = r >> 8
			g = g >> 8
			b = b >> 8

			// Get hex
			hex := fmt.Sprintf("#%02x%02x%02x", r, g, b)

			// Add code
			nameNum := fmt.Sprintf("%s_%d_%d", name, x, y)
			fall := "XX"
			hidden := "true"
			if y == im.Bounds().Dy()-1 && x == 0 {
				nameNum = name
				fall = "M1"
				hidden = "false"
			}
			top := fmt.Sprintf("%s_%d_%d", name, x, y-1)
			right := fmt.Sprintf("%s_%d_%d", name, x+1, y)

			// On top and right?
			if y == 0 && x == im.Bounds().Dx()-1 {
				fmt.Fprintf(out, `elements.%s = {
	color: "%s",
	behavior: [
		"XX|CR:%s_top AND CH:%s_top|XX",
		"XX|XX|DL",
		"XX|XX|XX",
	],
	category: "%s",
	state: "solid",
	density: 6942.0,
	hidden: %s,
}`+"\n\n", nameNum, hex, name, name, category, hidden)
				continue
			}

			// If on top?
			if y == 0 {
				fmt.Fprintf(out, `elements.%s = {
	color: "%s",
	behavior: [
		"XX|CR:%s_top AND CH:%s_top|XX",
		"XX|XX|CR:%s AND CH:%s",
		"XX|XX|XX",
	],
	category: "%s",
	state: "solid",
	density: 6942.0,
	hidden: %s,
}`+"\n\n", nameNum, hex, name, name, right, right, category, hidden)
				continue
			}

			// If on far right?
			if x == im.Bounds().Dx()-1 {
				fmt.Fprintf(out, `elements.%s = {
	color: "%s",
	behavior: [
		"XX|CR:%s AND CH:%s|XX",
		"XX|XX|DL",
		"XX|XX|XX",
	],
	category: "%s",
	state: "solid",
	density: 6942.0,
	hidden: %s,
}`+"\n\n", nameNum, hex, top, top, category, hidden)
				continue
			}

			fmt.Fprintf(out, `elements.%s = {
	color: "%s",
	behavior: [
		"XX|CR:%s AND CH:%s|XX",
		"XX|XX|CR:%s AND CH:%s",
		"XX|%s|XX",
	],
	category: "%s",
	state: "solid",
	density: 6942.0,
	hidden: %s,
}`+"\n\n", nameNum, hex, top, top, right, right, fall, category, hidden)
		}
	}
	return out.String()
}
