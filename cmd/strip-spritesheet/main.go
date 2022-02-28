package main

import (
	"bytes"
	"encoding/json"
	"image"
	"image/draw"
	"image/png"
	"io/ioutil"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// go run cmd/strip-spritesheet/main.go cmd/strip-spritesheet/inputs/UI. src/assets/ frameB.png selectionSquareActive_01.png
// jq -r '.items[].frameName' src/data.json | xargs go run cmd/strip-spritesheet/main.go cmd/strip-spritesheet/inputs/items. src/assets/items/
// go run cmd/strip-spritesheet/main.go cmd/strip-spritesheet/inputs/items. src/assets/ BoxOpen.png

func main() {
	name := os.Args[1]
	img, info, err := ReadFiles(name)
	if err != nil {
		panic(err)
	}

	dest := os.Args[2]

	framesToExtract := os.Args[3:]
	sort.Strings(framesToExtract)

	for _, f := range info[0].Frames {
		if len(framesToExtract) > 0 {
			if ix := sort.SearchStrings(framesToExtract, f.Filename); ix >= len(framesToExtract) || framesToExtract[ix] != f.Filename {
				continue
			}
		}
		if f.Rotated {
			continue
		}
		extract := image.NewRGBA(image.Rect(0, 0, f.SourceSize.W, f.SourceSize.H))
		sourceBounds := image.Rectangle{
			Min: image.Point{f.SpriteSourceSize.X, f.SpriteSourceSize.Y},
			Max: image.Point{f.SpriteSourceSize.X + f.SpriteSourceSize.W, f.SpriteSourceSize.Y + f.SpriteSourceSize.H},
		}
		draw.Draw(extract, sourceBounds, img, image.Point{f.Frame.X, f.Frame.Y}, draw.Src)

		outfile, err := os.Create(filepath.Join(dest, f.Filename))
		if err != nil {
			panic(err)
		}
		err = png.Encode(outfile, extract)
		if err != nil {
			panic(err)
		}
		outfile.Close()
	}
}

func ReadFiles(base string) (image.Image, []Texture, error) {
	if base[len(base)-1] == '.' {
		base = strings.TrimRight(base, ".")
	}

	jsonRaw, err := ioutil.ReadFile(base + ".json")
	if err != nil {
		return nil, nil, err
	}

	imageRaw, err := ioutil.ReadFile(base + ".png")
	if err != nil {
		return nil, nil, err
	}

	sheet := Spritesheet{}
	err = json.Unmarshal(jsonRaw, &sheet)
	if err != nil {
		return nil, nil, err
	}

	img, _, err := image.Decode(bytes.NewReader(imageRaw))
	if err != nil {
		return nil, nil, err
	}

	return img, sheet.Textures, nil
}

type Spritesheet struct {
	Textures []Texture
}

type Texture struct {
	Image  string `json:"image"`
	Format string `json:"format"`
	Size   struct {
		W int `json:"w"`
		H int `json:"h"`
	} `json:"size"`
	Scale  int `json:"scale"`
	Frames []struct {
		Filename   string `json:"filename"`
		Rotated    bool   `json:"rotated"`
		Trimmed    bool   `json:"trimmed"`
		SourceSize struct {
			W int `json:"w"`
			H int `json:"h"`
		} `json:"sourceSize"`
		SpriteSourceSize struct {
			X int `json:"x"`
			Y int `json:"y"`
			W int `json:"w"`
			H int `json:"h"`
		} `json:"spriteSourceSize"`
		Frame struct {
			X int `json:"x"`
			Y int `json:"y"`
			W int `json:"w"`
			H int `json:"h"`
		} `json:"frame"`
	} `json:"frames"`
}
