/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Markdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <Markdown>{content}</Markdown>
    </div>
  );
}
