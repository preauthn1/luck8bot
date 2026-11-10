<?php

namespace app\common;

use support\Log;
use Swoole\Coroutine\Http\Client;

class SwooleRequest
{
    /**
     * POST 请求（使用 Swoole 协程客户端）
     * @param string $url
     * @param array|string $data
     * @param array $headers
     * @param int $timeout
     * @return string
     * @throws \Exception
     */
    public function httpPost(string $url, array|string $data, $headers = [], $timeout = 3)
    {
        $urlInfo = parse_url($url);
        $scheme = $urlInfo['scheme'] ?? 'http';
        $host = $urlInfo['host'] ?? '';
        $port = $urlInfo['port'] ?? ($scheme === 'https' ? 443 : 80);
        $path = $urlInfo['path'] ?? '/';
        if (isset($urlInfo['query'])) {
            $path .= '?' . $urlInfo['query'];
        }
        if (empty($host)) {
            throw new \Exception('Invalid URL');
        }
        // 创建 Swoole HTTP 客户端
        $client = new Client($host, $port, $scheme === 'https');
        try {
            // 设置超时时间
            $client->set([
                'timeout' => $timeout,
            ]);

            // 处理数据
            $postData = '';
            $contentType = '';

            if (is_array($data)) {
                // 根据Content-Type决定数据格式
                if (isset($headers['Content-Type']) && strpos($headers['Content-Type'], 'application/json') !== false) {
                    $postData = json_encode($data, JSON_UNESCAPED_UNICODE);
                } else {
                    // 默认使用表单格式
                    $postData = http_build_query($data);
                    if (!isset($headers['Content-Type'])) {
                        $headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    }
                }
            } else {
                $postData = $data;
                if (!isset($headers['Content-Type'])) {
                    $headers['Content-Type'] = 'application/json';
                }
            }

            // 设置默认headers
            if (empty($headers)) {
                $headers = ["Content-Type" => "application/json"];
            }

            // 设置headers
            $clientHeaders = [];
            foreach ($headers as $key => $value) {
                if (is_numeric($key)) {
                    // 处理 ["Content-Type: application/json"] 格式的 header
                    $parts = explode(':', $value, 2);
                    if (count($parts) === 2) {
                        $clientHeaders[trim($parts[0])] = trim($parts[1]);
                    }
                } else {
                    $clientHeaders[$key] = $value;
                }
            }
            $client->setHeaders($clientHeaders);
            // 发送 POST 请求
            $client->post($path, $postData);
            // 检查响应
            if ($client->statusCode < 0) {
                throw new \Exception('Request exception: ' . $client->errMsg, 0);
            }

            return $client->body;
        } catch (\Exception $e) {
            throw $e;
        } finally {
            $client->close();
        }
    }

    /**
     * GET 请求（使用 Swoole 协程客户端）
     * @param string $url
     * @param array $params
     * @param array $headers
     * @param int $timeout
     * @return string
     * @throws \Exception
     */
    public function httpGet(string $url, $params = [], $headers = [], $timeout = 3)
    {
        // 处理 GET 参数
        if (!empty($params)) {
            if (is_array($params)) {
                $queryString = http_build_query($params);
                if (strpos($url, '?') !== false) {
                    $url .= '&' . $queryString;
                } else {
                    $url .= '?' . $queryString;
                }
            } else {
                if (strpos($url, '?') !== false) {
                    $url .= '&' . $params;
                } else {
                    $url .= '?' . $params;
                }
            }
        }

        // 解析 URL
        $urlInfo = parse_url($url);
        $scheme = $urlInfo['scheme'] ?? 'http';
        $host = $urlInfo['host'] ?? '';
        $port = $urlInfo['port'] ?? ($scheme === 'https' ? 443 : 80);
        $path = $urlInfo['path'] ?? '/';
        if (isset($urlInfo['query'])) {
            $path .= '?' . $urlInfo['query'];
        }

        if (empty($host)) {
            throw new \Exception('Invalid URL');
        }

        // 创建 Swoole HTTP 客户端
        $client = new Client($host, $port, $scheme === 'https');

        try {
            // 设置超时时间
            $client->set([
                'timeout' => $timeout,
            ]);
            // 设置默认 headers
            if (empty($headers)) {
                $headers = ["Content-Type" => "application/json"];
            }
            // 设置 headers
            $headerArray = [];
            foreach ($headers as $key => $value) {
                if (is_numeric($key)) {
                    // 处理 ["Content-Type: application/json"] 格式的 header
                    $parts = explode(':', $value, 2);
                    if (count($parts) === 2) {
                        $headerArray[$parts[0]] = trim($parts[1]);
                    }
                } else {
                    $headerArray[$key] = $value;
                }
            }
            $client->setHeaders($headerArray);
            // 发送 GET 请求
            $client->get($path);
            // 检查响应
            if ($client->statusCode < 0) {
                throw new \Exception('Request exception', 0);
            }
            return $client->body;
        } finally {
            $client->close();
        }
    }
}
