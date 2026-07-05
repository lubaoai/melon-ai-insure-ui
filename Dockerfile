FROM registry.cn-beijing.aliyuncs.com/dotbalo/nginx:1.15.12

COPY nginx.template /etc/nginx/conf.d/default.conf
COPY dist /etc/nginx/html/ui/melon-ai-insure-ui/

# 通过 envsubst 命令替换 nginx.template 模板中的变量，并覆盖/etc/nginx/nginx.conf
# CMD envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
