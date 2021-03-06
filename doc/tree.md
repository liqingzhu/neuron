# `config.tree`

```js
{
  // 1
  "A@1.2.0": [
    "1.2.0",
    // sync deps
    {
      "D@^4.0.0": [
        "4.1.0",
        {
          "E@^1.0.0": [
            "1.1.0"
            // 4
          ]
        }
      ],
      // An empty array indicates `E^2.0.0` uses a common `E@2.3.0`,
      // which means, A and B use a same `E^2.0.0`.
      // Using a common dependency will avoid unnecessary execution of factory functions.
      "F@^2.0.0": []
    },
    // async deps
    {}
  ],
  "B@5.0.0": [
    "5.0.0",
    {
      "D@^4.0.0": [
        "4.1.0",
        {
          "E@^1.0.0": [
            // Notice that, B uses a different `D@4.1.0` from A,
            // the dependency maps of the two `D@4.1.0` are different.
            "1.9.0"
          ]
        }
      ],
      "F@^2.0.0": []
    }, 
    // 2
  ],
  // Common `E@2.3.0`
  "F@^2.0.0": [
    "2.3.0", 
    // 3
    {}, 
    {
      "G@^3.0.0": [
        "3.100.0"
      ]
    }
  ]
}
```

## Convention

1. If depend on an explicit version, where also will be an version -> version object
2. If there is no async deps, it is not needed to be output
3. If there is any async deps, sync deps should always be output
4. If no deps, no need to output them


## Facades (pseudo codes)


- If there is a `facade('A')`, there should be a `'A@*' -> '1.2.0'` map
- If there is a `facade('A@^1.0.0')`, there should be a `'A@^1.0.0' -> '1.2.0'` map

