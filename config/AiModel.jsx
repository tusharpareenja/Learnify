const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY||'AIzaSyCT03WhdlwQQ3Ma2GbEItL5f4MVNA6AAZo';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  }); 
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following\nDetail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming' Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Introduction to Python Programming\",\n  \"description\": \"This introductory course provides a foundational understanding of Python programming.  We'll cover basic syntax, data types, control flow, and fundamental programming concepts.  Ideal for beginners with little to no prior programming experience.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Setting up Your Python Environment\",\n      \"about\": \"Learn how to install Python, choose an IDE or text editor, and run your first Python program. We'll cover different installation methods and common issues.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Basic Syntax and Data Types\",\n      \"about\": \"Introduction to Python's syntax, including variables, operators, and basic data types like integers, floats, strings, and booleans. We'll practice with simple exercises.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow: Conditional Statements and Loops\",\n      \"about\": \"Mastering conditional statements (if, elif, else) and loops (for, while) to control the flow of your programs.  We'll cover nested loops and break/continue statements.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Working with Data Structures: Lists and Dictionaries\",\n      \"about\": \"Learn to use lists and dictionaries – fundamental data structures in Python – to store and manipulate collections of data. We'll cover common operations and methods.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions and Modules\",\n      \"about\": \"Understanding functions to organize and reuse code. We'll introduce the concept of modules and how to import and use pre-built functions.\",\n      \"duration\": \"5 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"totalDuration\": \"1 hour\" ,\n  \"noOfChapters\": 5\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

    export const generatechaptercontent_ai = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in detail on topic:DSA, chapter:Graph Algorithms: Breadth-First Search and Depth-First Search, in JSON fromat with list of array with field as Title, description, code Example(code field in <precode> format) if applicable\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"Graph Algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS)\",\n  \"chapters\": [\n    {\n      \"Title\": \"Breadth-First Search (BFS)\",\n      \"description\": \"BFS is a graph traversal algorithm that explores a graph level by level. It starts at a root node and visits all its neighbors before moving to the next level of neighbors.  It uses a queue data structure to manage the nodes to be visited.  BFS is commonly used to find the shortest path in unweighted graphs and to detect connected components.\",\n      \"codeExample\": \"<precode><code>\\nimport collections\\n\\ndef bfs(graph, start):\\n    visited = set()\\n    queue = collections.deque([start])\\n    visited.add(start)\\n    while queue:\\n        vertex = queue.popleft()\\n        print(vertex, end=\\\" \\\")\\n        for neighbor in graph[vertex]:\\n            if neighbor not in visited:\\n                visited.add(neighbor)\\n                queue.append(neighbor)\\n\\ngraph = {\\n    'A': ['B', 'C'],\\n    'B': ['D', 'E'],\\n    'C': ['F'],\\n    'D': [],\\n    'E': ['F'],\\n    'F': []\\n}\\n\\nbfs(graph, 'A') # Output: A B C D E F \\n</code></precode>\"\n    },\n    {\n      \"Title\": \"Depth-First Search (DFS)\",\n      \"description\": \"DFS is a graph traversal algorithm that explores a graph by going as deep as possible along each branch before backtracking. It uses a stack (implicitly through recursion or explicitly using a stack data structure) to manage the nodes to be visited. DFS is commonly used for topological sorting, detecting cycles in a graph, and finding strongly connected components.\",\n      \"codeExample\": \"<precode><code>\\ndef dfs(graph, start, visited=None):\\n    if visited is None:\\n        visited = set()\\n    visited.add(start)\\n    print(start, end=\\\" \\\")\\n    for neighbor in graph[start]:\\n        if neighbor not in visited:\\n            dfs(graph, neighbor, visited)\\n\\ngraph = {\\n    'A': ['B', 'C'],\\n    'B': ['D', 'E'],\\n    'C': ['F'],\\n    'D': [],\\n    'E': ['F'],\\n    'F': []\\n}\\n\\ndfs(graph, 'A') # Output: A B D E F C (order may vary slightly depending on implementation)\\n</code></precode>\"\n    },\n    {\n      \"Title\": \"BFS vs. DFS\",\n      \"description\": \"BFS and DFS are both fundamental graph traversal algorithms, but they differ significantly in their approach and applications. BFS explores the graph breadth-wise, finding the shortest path in unweighted graphs, while DFS explores depth-wise, useful for tasks like topological sorting and cycle detection. The choice between BFS and DFS depends on the specific problem being solved.\",\n      \"codeExample\": \"\" \n    },\n    {\n      \"Title\": \"Applications of BFS and DFS\",\n      \"description\": \"BFS and DFS have wide-ranging applications in computer science.  \\n* **BFS:** Shortest path in unweighted graphs, finding connected components, peer-to-peer networks, broadcasting in networks.\\n* **DFS:** Topological sorting, cycle detection, finding strongly connected components, solving puzzles (like mazes),  searching in file systems.\",\n      \"codeExample\": \"\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  