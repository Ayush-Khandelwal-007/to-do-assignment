import { useEffect, useState } from 'react';
import 'pages/Dashboard/styling.css';
import axiosInstance from 'utils/axios';
import { Pagination } from '@material-ui/lab';
import { todoActions } from 'utils/actionTypes';
import { useDispatch } from 'react-redux';
import TodoTable from 'components/TodoTable';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(2);

    useEffect(() => {
        axiosInstance
            .get('/public/v1/todos', {
                params: {
                    page: pageNumber,
                },
            })
            .then((res) => {
                setTotalPages(res.data.meta.pagination.pages);
                dispatch({
                    type: todoActions.SetTodo,
                    todos: res.data.data.map((item) => {
                        return { ...item, due_on: item.due_on.split('T')[0] };
                    }),
                });
                console.log(res);
            });
    }, [dispatch, pageNumber]);
    return (
        <div className="taskScreen">
            <div className="charts">
                <TodoTable />
            </div>
            <div className="paginationBar">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={totalPages}
                    color="primary"
                    onChange={(e, v) => setPageNumber(v)}
                />
            </div>
        </div>
    );
};

export default Dashboard;
