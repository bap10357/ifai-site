#!/bin/bash

find . -type f -name index.md | while IFS= read -r file; do
  perl -i -0777 -pe '
    s/(alt="([^"]*?))(?![。．.])")/$1. "/ge;
    s{(<figcaption>)(.*?)(</figcaption>)}{
      my ($start,$text,$end) = ($1,$2,$3);
      if ($text !~ /[。．.]$/) {
        $text .= ($text =~ /\p{Han}/ ? "。" : ".");
      }
      $start . $text . $end;
    }gse
  ' "$file"
done

