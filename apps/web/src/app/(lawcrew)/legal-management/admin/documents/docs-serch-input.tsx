"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useSearchParam } from "@/hooks/use-serch-params";

const DocsSearchbar = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useSearchParam("search");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery("");
    setSearch("");
    inputRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(query); // Update search param on Enter
      inputRef.current?.blur();
    }
  };

  const handleSearchClick = () => {
    setSearch(query); // Update search param on button click
    inputRef.current?.blur();
  };

  return (
    <div className="relative flex w-full max-w-sm items-center gap-2">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
        <Input
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search documents..."
          className="pl-9 pr-9"
          ref={inputRef}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
        variant="default"
        onClick={handleSearchClick}
        disabled={!query.trim()}
      >
        Search
      </Button>
    </div>
  );
};

export default DocsSearchbar;
