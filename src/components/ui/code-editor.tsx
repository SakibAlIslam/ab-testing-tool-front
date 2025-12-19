"use client";

import { Editor } from "@monaco-editor/react";
import { cn } from "../../lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "css" | "javascript";
  placeholder?: string;
  className?: string;
  height?: string;
  minimap?: boolean;
  wordWrap?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  placeholder,
  className,
  height = "300px",
  minimap = false,
  wordWrap = true,
}: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className={cn("border border-border rounded-md overflow-hidden", className)}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: minimap },
          wordWrap: wordWrap ? "on" : "off",
          lineNumbers: "on",
          renderLineHighlight: "line",
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
          tabSize: 2,
          insertSpaces: true,
          automaticLayout: true,
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          parameterHints: {
            enabled: true,
          },
          folding: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          padding: { top: 8, bottom: 8 },
          placeholder: placeholder || (language === "css" 
            ? "/* Add your variation-specific CSS here */" 
            : "// Add your variation-specific JavaScript here"
          ),
        }}
        beforeMount={(monaco) => {
          // Configure additional settings if needed
          monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
              'editor.background': '#1e1e1e',
              'editor.foreground': '#d4d4d4',
              'editor.lineHighlightBackground': '#2d2d2d',
            }
          });
        }}
      />
    </div>
  );
}
