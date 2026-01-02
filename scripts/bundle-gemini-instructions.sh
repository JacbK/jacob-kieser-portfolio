#!/bin/bash

# Bundles instructions and skills into a single context file for Gemini
# Must be run from project root

OUTPUT_FILE=".agent/gemini_context.md"

# Ensure we are in project root
if [ ! -d ".agent" ]; then
  echo "Error: .agent directory not found. Please run from project root."
  exit 1
fi

echo "Bundling instructions for Gemini..."

echo "# Persona: Complete Instructions for Gemini" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "You are an AI assistant helping users build a unique portfolio website from scratch." >> "$OUTPUT_FILE"
echo "Below are your core instructions and all necessary skills combined into one context." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "## Core Instructions" >> "$OUTPUT_FILE"
cat .agent/instructions.md >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "## Skills Reference" >> "$OUTPUT_FILE"
echo "The following skills are available to you and should be applied as needed." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

for file in .agent/skills/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        skill_name="${filename%.*}"
        echo "### Skill: $skill_name" >> "$OUTPUT_FILE"
        echo "Content from $file:" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "---" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done

# Include profile.yaml if it exists
if [ -f "profile.yaml" ]; then
    echo "## User Profile Configuration" >> "$OUTPUT_FILE"
    echo "This is the current configuration set by the user (profile.yaml):" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`yaml" >> "$OUTPUT_FILE"
    cat "profile.yaml" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
fi

echo "End of bundled instructions." >> "$OUTPUT_FILE"

echo "Created $OUTPUT_FILE"
