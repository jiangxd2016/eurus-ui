import type MarkdownIt from 'markdown-it';
import Container from 'markdown-it-container';

export const mdPlugin = async (md: MarkdownIt) => {
  md.use(Container, 'card', {
    render: (tokens: { [x: string]: any }, idx: string | number) => {
      const token = tokens[idx];

      // console.log('token :>> ', token)

      const title = token.info.trim().slice(5).trim();
      const titleHtml = md.render(`## ${title}`);

      return token.nesting === 1 ? `<Demo>${titleHtml}` : '</Demo>\n';
    },
  });
  md.use(Container, 'code', {
    render: (tokens: { [x: string]: any }, idx: string | number) => {
      const token = tokens[idx];

      const demoName = token.info.trim().slice(5).trim();

      return token.nesting === 1 ? `<template #demo><${demoName} /></template><template #code>` : '</template>\n';
    },
  });
};

