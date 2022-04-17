import {useEffect, useState} from "react";

export const gql = ([content]: TemplateStringsArray) => content;

export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>
) {
  return fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(x => x.json())
    .then(({ data, errors }) => {
      if (errors) {
        throw new Error(
          `GraphQL errors occurred:\n${errors
            .map((x: any) => x.message)
            .join('\n')}`
        );
      }
      return data;
    });
}


export const useWindowScrollPositions = () => {

    const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })

    useEffect(() => {
        function updatePosition() {
            setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
        }

        window.addEventListener('scroll', updatePosition)
        // updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    }, [scrollPosition])

    return scrollPosition
}
export const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        function updatePosition() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener('load', updatePosition)
        // updatePosition()

        return () => window.removeEventListener('resize', updatePosition)
    }, [windowSize])

    return windowSize
}