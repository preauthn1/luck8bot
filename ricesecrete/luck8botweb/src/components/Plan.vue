<template>
    <div class="table-wrapper">
        <table class="prediction-table">
            <thead>
                <tr>
                    <th>Kỳ</th>
                    <th>Giải đặc biệt</th>
                    <th>Kết quả dự đoán</th>
                    <th>Dự đoán</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in list" :key="item.ky">
                    <td>{{ item.ky }}</td>

                    <td class="special">
                        {{ item.special || '—' }}
                    </td>

                    <td>
                        <span class="result" :class="item.result">
                            {{ resultText(item.result) }}
                        </span>
                    </td>

                    <td class="numbers">
                        <span v-for="num in item.predict" :key="num">
                            {{ num }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
    {
        ky: 140,
        special: '',
        result: 'waiting',
        predict: ['00', '13', '17', '49', '63', '75', '82', '93']
    },
    {
        ky: 139,
        special: '5,3,2,0,7',
        result: 'fail',
        predict: ['01', '04', '19', '30', '38', '61', '69', '98']
    },
    {
        ky: 138,
        special: '5,1,6,3,6',
        result: 'fail',
        predict: ['01', '24', '50', '53', '75', '80', '88', '97']
    }
])

const resultText = (type) => {
    const map = {
        success: 'Trúng',
        fail: 'Trượt',
        waiting: 'Đợi mở'
    }
    return map[type] || ''
}
</script>

<style scoped>
.table-wrapper {
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
}

.prediction-table {
  width: 100%;
  border-collapse: collapse;
  /* border: 1px solid #eee; ⭐ 表格外边框 */
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
}

.prediction-table th,
.prediction-table td {
    padding: 10px;
  border-collapse: collapse;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
}
.prediction-table th {
    font-weight: 600;
    color: #333;
    background-color: #f1f1f1;
    
}

.special {
    color: #555;
}

.result {
    font-weight: 600;
}

.result.fail {
    color: #e53935;
}

.result.success {
    color: #2e7d32;
}

.result.waiting {
    color: #1e88e5;
}

.numbers span {
    display: inline-block;
    margin-right: 6px;
    color: #555;
}
</style>