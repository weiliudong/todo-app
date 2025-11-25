// 待办核心逻辑
import {ref, computed, watch} from 'vue'
import {format} from 'date-fns' // 日期格式化工具

// 安装依赖：npm install date-fns
export function useTodo() {
    // 批量删除弹窗状态
    const batchDeleteDialogVisible = ref(false)
    // 单个删除弹框状态
    const singleDeleteDialog = ref({
        visible: false,
        todoId: null
    })

    // 基础数据
    const todos = ref([]) // 所有待办
    const newTodo = ref({
        text: '',
        category: '工作',
        priority: '中',
        deadline: '',
    })
    const filterConditions = ref({
        search: '',
        status: 'all', // all/completed/uncompleted
        category: 'all',
        priority: 'all',
        dateRange: {start: '', end: ''},
    })
    const editTodoId = ref(null) // 正在编辑的待办ID
    const editTodoText = ref('') // 编辑的文本

    // 初始化：从本地存储加载
    const initTodos = () => {
        const saved = localStorage.getItem('todos_v2')
        if (saved) todos.value = JSON.parse(saved)
    }

    // 本地存储持久化
    watch(todos, (newTodos) => {
        localStorage.setItem('todos_v2', JSON.stringify(newTodos))
    }, {deep: true})

    // 生成唯一ID
    const generateId = () => {
        return Date.now() + Math.floor(Math.random() * 1000)
    }

    // 筛选后的待办列表
    const filteredTodos = computed(() => {
        return todos.value.filter(todo => {
            // 搜索关键词筛选
            if (filterConditions.value.search && !todo.text.includes(filterConditions.value.search)) return false
            // 状态筛选
            if (filterConditions.value.status === 'completed' && !todo.completed) return false
            if (filterConditions.value.status === 'uncompleted' && todo.completed) return false
            // 分类筛选
            if (filterConditions.value.category !== 'all' && todo.category !== filterConditions.value.category) return false
            // 优先级筛选
            if (filterConditions.value.priority !== 'all' && todo.priority !== filterConditions.value.priority) return false
            // 日期范围筛选
            if (filterConditions.value.dateRange.start && todo.deadline) {
                const todoDate = new Date(todo.deadline).getTime()
                const startDate = new Date(filterConditions.value.dateRange.start).getTime()
                const endDate = filterConditions.value.dateRange.end ? new Date(filterConditions.value.dateRange.end).getTime() : Date.now()
                if (todoDate < startDate || todoDate > endDate) return false
            }
            return true
        })
    })

    // 统计数据
    const stats = computed(() => {
        const total = todos.value.length
        const completed = todos.value.filter(t => t.completed).length
        const uncompleted = total - completed
        // 按分类统计
        const categoryStats = {}
        todos.value.forEach(t => {
            categoryStats[t.category] = (categoryStats[t.category] || 0) + 1
        })
        // 按优先级统计
        const priorityStats = {
            高: todos.value.filter(t => t.priority === '高').length,
            中: todos.value.filter(t => t.priority === '中').length,
            低: todos.value.filter(t => t.priority === '低').length,
        }
        // 过期待办（截止日期已过且未完成）
        const expired = todos.value.filter(t => !t.completed && t.deadline && new Date(t.deadline).getTime() < Date.now()).length

        return {total, completed, uncompleted, categoryStats, priorityStats, expired}
    })

    // 常用分类（可扩展）
    const categories = ref(['工作', '生活', '学习'])

    // 添加待办
    const addTodo = () => {
        if (!newTodo.value.text.trim()) return
        todos.value.unshift({
            id: generateId(),
            text: newTodo.value.text.trim(),
            category: newTodo.value.category,
            priority: newTodo.value.priority,
            deadline: newTodo.value.deadline,
            completed: false,
            createTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })
        // 重置表单
        newTodo.value = {text: '', category: '工作', priority: '中', deadline: ''}
    }

    // 编辑待办
    const startEdit = (todo) => {
        editTodoId.value = todo.id
        editTodoText.value = todo.text
    }
    const confirmEdit = (id) => {
        if (!editTodoText.value.trim()) return
        const idx = todos.value.findIndex(t => t.id === id)
        if (idx > -1) todos.value[idx].text = editTodoText.value.trim()
        editTodoId.value = null
    }
    const cancelEdit = () => {
        editTodoId.value = null
        editTodoText.value = ''
    }

    // 删除待办
    const deleteTodo = (id) => {
        todos.value = todos.value.filter(t => t.id !== id)
    }
    const singleDelete = (todoId) => {
        singleDeleteDialog.value = { visible: true, todoId }
    }
    // 确认单个删除
    const confirmSingleDeleteAction = () => {
        if (singleDeleteDialog.value.todoId) {
            deleteTodo(singleDeleteDialog.value.todoId)
            singleDeleteDialog.value = { visible: false, todoId: null }
        }
    }

    // 批量操作
    const batchComplete = () => {
        todos.value.forEach(t => {
            if (filteredTodos.value.includes(t)) t.completed = true
        })
    }
    const batchDelete = () => {
        // if (!confirm('确定删除选中的待办？')) return
        // todos.value = todos.value.filter(t => !filteredTodos.value.includes(t))

        // 打开弹窗
        batchDeleteDialogVisible.value = true
    }
    // 确认批量删除
    const confirmBatchDeleteAction = () => {
        todos.value = todos.value.filter(t => !filteredTodos.value.includes(t))
        batchDeleteDialogVisible.value = false
    }

    // 切换待办状态
    const toggleTodo = (id) => {
        const idx = todos.value.findIndex(t => t.id === id)
        if (idx > -1) todos.value[idx].completed = !todos.value[idx].completed
    }

    // 添加自定义分类
    const addCategory = (name) => {
        if (!name.trim() || categories.value.includes(name.trim())) return
        categories.value.push(name.trim())
    }

    return {
        todos,
        newTodo,
        filterConditions,
        editTodoId,
        editTodoText,
        filteredTodos,
        stats,
        categories,
        singleDeleteDialog,
        batchDeleteDialogVisible,
        initTodos,
        addTodo,
        startEdit,
        confirmEdit,
        cancelEdit,
        deleteTodo,
        singleDelete,
        batchComplete,
        batchDelete,
        toggleTodo,
        addCategory,
        confirmSingleDeleteAction,
        confirmBatchDeleteAction
    }
}
