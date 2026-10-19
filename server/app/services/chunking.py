"""Sentence-aware text splitter (no extra dependencies).

Greedily packs sentences into ~`size`-character chunks and carries an
`overlap`-character tail into the next chunk so meaning crossing a boundary
is not lost. Oversized single sentences are hard-windowed.
"""
import re

_SENTENCE_BOUNDARY = re.compile(r"(?<=[.!?])\s+")


def chunk_text(text: str, *, size: int = 800, overlap: int = 150) -> list[str]:
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if not text:
        return []
    if len(text) <= size:
        return [text]

    sentences = [s.strip() for s in _SENTENCE_BOUNDARY.split(text) if s.strip()]
    chunks: list[str] = []
    current: list[str] = []
    length = 0

    for sentence in sentences:
        if len(sentence) > size:
            # Oversized sentence: flush, then hard-window it.
            if current:
                chunks.append(" ".join(current))
                current, length = [], 0
            start = 0
            while start < len(sentence):
                end = min(start + size, len(sentence))
                chunks.append(sentence[start:end])
                if end == len(sentence):
                    break
                start = max(end - overlap, start + 1)
            continue

        added = len(sentence) + (1 if current else 0)
        if length + added > size and current:
            chunks.append(" ".join(current))
            tail = chunks[-1][-overlap:] if overlap > 0 else ""
            current = [tail] if tail else []
            length = len(tail)
        current.append(sentence)
        length += added

    if current:
        chunks.append(" ".join(current))
    return [chunk for chunk in chunks if chunk.strip()]
