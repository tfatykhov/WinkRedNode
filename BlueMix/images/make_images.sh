#!/bin/bash

for A in *.tiff ; do
  B=`basename $A .tiff`
  tifftopnm < $A | pamscale 0.60 | pnmtopng > $B.png
done

for A in 1[5678].tiff ; do
  B=`basename $A .tiff`
  tifftopnm < $A | pnmtopng > $B.png
done
