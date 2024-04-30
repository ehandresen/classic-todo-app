const GetTodo = () => {

    useEffect(() => {
        console.log('useEffect');
        todoService
          .getAll()
          .then((response) => {
            console.log('promise resolved');
            return response.json();
          })
          .then((json) => setTodos(json));
      }, []);
    return (
        
    );
}

export default GetTodo;