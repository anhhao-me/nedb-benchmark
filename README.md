# NeDB Benchmark

**Latest Result**


```
In-memory test - without indexing
 + Insert 10000 docs in 411ms: 24330 ops/s
 + Find 10000 docs in 56992ms: 175 ops/s
 - Memory Used: 5 MB
In-memory test - with indexing
 + Insert 10000 docs in 341ms: 29325 ops/s
 + Find 10000 docs in 196ms: 51020 ops/s
 - Memory Used: 20 MB
Disk test - without indexing
 + Insert 10000 docs in 5614ms: 1781 ops/s
 + Find 10000 docs in 64066ms: 156 ops/s
 - Memory Used: -13 MB
Disk test - with indexing
 + Insert 10000 docs in 4749ms: 2105 ops/s
 + Find 10000 docs in 199ms: 50251 ops/s
 - Memory Used: 4 MB
```